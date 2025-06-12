import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function UpdateMember({ show, handleClose, memberId, onSuccess }) {
    // 表單欄位狀態
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [changePassword, setChangePassword] = useState(false); // 是否變更密碼
    
    // 表單控制狀態
    const [validated, setValidated] = useState(false);    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);    // 載入會員資料
    const loadMemberData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setError('未找到認證 token，請重新登入');
                return;
            }
              const data = {
                mId: memberId
            };const response = await authAxios.post('?action=getMembers', Qs.stringify(data));
            
            if (response.data.status === 200) {
                const memberData = response.data.result[0];
                // 設置表單初始值
                setName(memberData.name);
                setPhone(memberData.phone);
                setEmail(memberData.email);
                setPassword(memberData.password);
                setChangePassword(false);            } else {
                setError("無法載入會員資料：" + (response.data.message || "未知錯誤"));
            }
        } catch (err) {
            console.error("載入會員資料時出錯:", err);
            setError("載入會員資料時發生錯誤，請稍後再試。");
        } finally {
            setLoading(false);
        }
    }, [memberId]);

    // 當 memberId 變動時載入會員資料
    useEffect(() => {
        if (show && memberId) {
            loadMemberData();
        }
    }, [show, memberId, loadMemberData]);

    // 重設表單
    const resetForm = () => {
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setChangePassword(false);
        setValidated(false);
        setError(null);
        setSuccess(null);
    };

    // 關閉對話框
    const handleModalClose = () => {
        resetForm();
        handleClose();
    };

    // 提交表單
    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        
        // 表單驗證
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        
        setSubmitting(true);
        setError(null);
        setSuccess(null);
        
        // 準備更新的資料
        const data = {
            mId: memberId,
            name,
            phone,
            email,
            password
        };
         try {
            const authAxios = getAuthAxios();
            if (!authAxios) {
                setError('未找到認證 token，請重新登入');
                return;
            }
            
            const res = await authAxios.post('?action=updateMember', Qs.stringify(data));
            const response = res.data;
           
            if (response.status === 200) {
                setSuccess("會員資料更新成功！");
                // 延遲關閉視窗，讓使用者看到成功訊息
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                    handleModalClose();
                }, 1500);
            } else {
                setError(response.message || "更新失敗，請檢查資料是否正確。");
            }
        } catch (err) {
            console.error("更新會員資料失敗:", err);
            setError("更新會員資料失敗，請稍後再試或聯絡系統管理員。");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>編輯會員</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                {loading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">載入中...</span>
                        </div>
                        <p className="mt-2">載入會員資料中...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <Alert variant="danger" className="mb-3">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                            </Alert>
                        )}
                        
                        {success && (
                            <Alert variant="success" className="mb-3">
                                <i className="bi bi-check-circle me-2"></i>
                                {success}
                            </Alert>
                        )}
                        
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="validationId">
                                <Form.Label>會員 ID：{memberId}</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationName">
                                <Form.Label>姓名</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="請輸入姓名"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    請提供姓名。
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="validationPhone">
                                <Form.Label>電話</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="請輸入電話"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="validationEmail">
                                <Form.Label>電子郵件</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="請輸入電子郵件"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    請提供有效的電子郵件地址。
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="changePassword">
                                <Form.Check 
                                    type="checkbox"
                                    label="變更密碼"
                                    checked={changePassword}
                                    onChange={(e) => setChangePassword(e.target.checked)}
                                />
                            </Form.Group>

                            {changePassword && (
                                <Form.Group className="mb-3" controlId="validationPassword">
                                    <Form.Label>新密碼</Form.Label>
                                    <Form.Control
                                        required={changePassword}
                                        type="password"
                                        placeholder="請輸入新密碼"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength="6"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        請提供至少6位的新密碼。
                                    </Form.Control.Feedback>
                                </Form.Group>
                            )}
                        </Form>
                    </>
                )}
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose} disabled={submitting || loading}>
                    取消
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={submitting || loading}
                >
                    {submitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            更新中...
                        </>
                    ) : '更新會員'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}