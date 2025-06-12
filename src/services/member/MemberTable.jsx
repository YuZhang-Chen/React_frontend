import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getMembers } from './api'; // Adjust the import path as necessary
import CreateMember from './CreateMember';
import DeleteMember from './DeleteMember';
import UpdateMember from './UpdateMember';

export default function MemberTable() {
    // Create Modal 
    const [members, setMembers] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    // Update Modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [memberToUpdate, setMemberToUpdate] = useState(null);

    const fetchMembers = async () => {
        try {
            const res = await getMembers();
            const response = res.data;
              if (response.status === 200) {
                setMembers(response.result);
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    };
    const handleModalClose = () => {
        setShowCreateModal(false);
    };

    const handleCreateSuccess = () => {
        // 重新載入會員資料
        fetchMembers();
    };

    // 刪除會員
    const handleDeleteClick = (member) => {
        setMemberToDelete(member);
        setShowDeleteModal(true);
    };
    
    const handleDeleteClose = () => {
        setShowDeleteModal(false);
        setMemberToDelete(null);
    };

    // 更新會員
    const handleUpdateClick = (member) => {
        setMemberToUpdate(member);
        setShowUpdateModal(true);
    };
    
    const handleUpdateClose = () => {
        setShowUpdateModal(false);
        setMemberToUpdate(null);
    };

    useEffect(() => {
        fetchMembers();
    }, []);
    
    
    return (
        <>
        <div className="mb-3 d-flex justify-content-end">
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>新增使用者
        </Button>
        
        <CreateMember 
            show={showCreateModal} 
            handleClose={handleModalClose} 
            onSuccess={handleCreateSuccess}
        />

        <DeleteMember
            member={memberToDelete}
            show={showDeleteModal}
            handleClose={handleDeleteClose}
            onSuccess={fetchMembers} // 重新載入會員資料
        />

        <UpdateMember
            show={showUpdateModal}
            handleClose={handleUpdateClose}
            memberId={memberToUpdate?.mId} // 確保正確使用 mId
            onSuccess={fetchMembers}
        />

        </div>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>會員ID</th>
                    <th>姓名</th>
                    <th>電話</th>
                    <th>電子郵件</th>
                    <th>密碼</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {members.length > 0 ? (
                    members.map((member, index) => (
                        <tr key={member.id || index}>
                            <td>{index+1}</td>
                            <td>{member.mId}</td>
                            <td>{member.name}</td>
                            <td>{member.phone}</td>
                            <td>{member.email}</td>
                            <td>{member.password}</td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => handleUpdateClick(member)}>
                                    <i className="bi bi-pencil"></i>
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(member)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">無會員資料</td>
                    </tr>
                )}
            </tbody>
            
        </Table>
        </>
    )
    
}