
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { getAuthAxios } from '../../utils/authAxios';
import Qs from 'qs';

export default function CreateMember({ show, handleClose, onSuccess }) {
    const [mId, setMId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [validated, setValidated] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const resetForm = () => {
        setMId("");
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setValidated(false);
        setError(null);
        setSuccess(null);
    };

    const handleModalClose = () => {
        resetForm();
        handleClose();
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        // 表單驗證
        const form = document.getElementById('createMemberForm');
        if (form && !form.checkValidity()) {
            setValidated(true);
            return;
        }
        setSubmitting(true);  // 開始提交，設置 submitting 狀態
        setError(null);       // 重設錯誤訊息
        setSuccess(null);     // 重設成功訊息

        const data = {
            mId,
            name,
            phone,
            email,
            password
        }; 
        
        const authAxios = getAuthAxios();
        if (!authAxios) {
            setSubmitting(false);
            setError('未找到認證 token，請重新登入');
            return;
        }
        console.log(data);
        
        authAxios.post('?action=newMember', Qs.stringify(data))
        .then(res => {
            setSubmitting(false);
            const response = res.data;
                         if (response.status === 200) {
                setSuccess(response.message || "會員新增成功！");
                // 延遲關閉視窗，讓使用者看到成功訊息
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                    resetForm();
                    handleClose();
                }, 1500);
            } else {
                setError(response.message || "新增失敗，請檢查資料是否正確。");
            }
        })
        .catch(error => {
            console.error("Error creating member:", error);
            setSubmitting(false);
            setError("新增會員失敗，請稍後再試或聯絡系統管理員。");
        });

    };
    return (
        <Modal show={show} onHide={handleModalClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>新增會員</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                {success && (
                    <Alert variant="success" className="mb-3">
                        <i className="bi bi-check-circle me-2"></i>
                        {success}
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger" className="mb-3">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                    </Alert>
                )}                <Form id="createMemberForm" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationMId">
                    <Form.Label>會員 ID</Form.Label>
                    <Form.Control
                    required
                    type="text"
                    placeholder="請輸入會員ID"
                    value={mId}
                    onChange={(e) => setMId(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                    請提供有效的會員 ID。
                    </Form.Control.Feedback>
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

                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                    required
                    type="password"
                    placeholder="請輸入密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    取消
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={submitting}
                >
                    {submitting ? '處理中...' : '新增會員'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}