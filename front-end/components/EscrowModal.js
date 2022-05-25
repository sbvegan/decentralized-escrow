import { Modal } from "web3uikit"

export default function EscrowModal({ children }) {
    return (
        <div
            style={{
                height: '90vh',
                transform: 'scale(1)'
            }}
        >
            <div>
                <Modal
                    cancelText="Discard Changes"
                    id="regular"
                    isVisible={children}
                    okText="Save Changes"
                    onCancel={function noRefCheck() { }}
                    onCloseButtonPressed={function noRefCheck() { }}
                    onOk={function noRefCheck() { }}
                    title={<div style={{ display: 'flex', gap: 10 }}><Icon fill="#68738D" size={28} svg="edit" /><Typography color="#68738D" variant="h3">Edit Nickname</Typography></div>}
                >
                    <div
                        style={{
                            padding: '20px 0 20px 0'
                        }}
                    >
                        <Input
                            label="Nickname"
                            width="100%"
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}