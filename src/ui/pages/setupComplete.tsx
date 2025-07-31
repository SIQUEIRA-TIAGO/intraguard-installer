import { Button, Col, Flex, Image, Row, Typography } from 'antd'
import React from 'react'
import logo from '../assets/intraguard-logo.png'
import RootLayout from '../layout'

export default function SetupComplete() {
    const handleFinish = () => {
        window.electronAPI.closeApp()
    }

    return (
        <RootLayout
            footer={
                <Flex justify='end' align='center'>
                    <Button
                        size='small'
                        onClick={handleFinish}
                        variant='outlined'
                        color='primary'
                    >
                        Finalizar
                    </Button>
                </Flex>
            }
        >
            <Row gutter={[16, 0]} style={{ height: '100%' }}>
                <Col span={6}>
                    <div style={{ height: '100%' }}>
                        <div
                            style={{
                                backgroundColor: '#FEB62C',
                                height: '100%'
                            }}
                        >
                            <Image
                                preview={false}
                                src={logo}
                                alt='Intraguard-logo'
                            />
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <Flex vertical style={{ height: '100%' }}>
                        <Typography.Title level={4}>
                            Instalação concluída
                        </Typography.Title>
                        <Typography.Paragraph>
                            A instalação dos serviços para o Intraguard foi
                            concluída no seu computador. Os serviços são
                            iniciados automaticamente.
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Clique em <i>Finalizar</i> para sair do instalador.
                        </Typography.Paragraph>
                    </Flex>
                </Col>
            </Row>
        </RootLayout>
    )
}
