import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Qs from 'qs';
import { getAuthAxios } from '../../utils/authAxios';

export default function DeleteMember({ member, show, handleClose, onSuccess }) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // 新增成功狀態
    
    const handleDelete = async () => {
        if (!member) return;
        
        try {            setDeleting(true);
            setError(null);
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setError('未找到認證 token，請重新登入');
                return;
            }
            
            const data = {
                mId: member.mId,
            }
            const res = await authAxios.post('?action=removeMember', Qs.stringify(data));
            const response = res.data;
              if (response.status === 200) {
                // 設置成功狀態
                setSuccess(true);
                
                // 通知父組件重新載入資料
                if (onSuccess) {
                    onSuccess();
                }
                
                // 延遲 1.5 秒後關閉對話框
                setTimeout(() => {
                    handleClose();
                    setSuccess(false); // 重置成功狀態
                }, 1500);
            } else {
                // 服務器回應錯誤
                setError(response.message || "刪除失敗，請稍後再試。");
            }
        } catch (error) {
            console.error("刪除會員時發生錯誤:", error);
            setError("刪除會員時發生錯誤，請稍後再試。");
        } finally {
            setDeleting(false);
        }
    };
    
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>刪除確認</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : success ? (
                    // 成功訊息
                    <div className="alert alert-success">
                        <i className="bi bi-check-circle me-2"></i>
                        會員 <strong>{member?.name}</strong> 已成功刪除！
                    </div>
                ) : (
                    <>
                        您確定要刪除會員 <strong>{member?.name}</strong> (ID: {member?.mId}) 嗎？
                        <div className="text-danger mt-2">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            此操作無法復原。
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="secondary" 
                    onClick={handleClose} 
                    disabled={deleting || success}
                >
                    取消
                </Button>
                <Button 
                    variant="danger" 
                    onClick={handleDelete} 
                    disabled={deleting || error || success}
                >
                    {deleting ? '處理中...' : success ? '刪除成功！' : '確認刪除'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}