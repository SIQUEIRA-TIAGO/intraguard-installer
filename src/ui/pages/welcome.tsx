import { Alert, Button, Col, Flex, Form, Image, Input, Row, Typography } from 'antd'
import React from 'react'
import logo from '../assets/intraguard-logo.png'
import RootLayout from '../layout'
import { useNavigate } from 'react-router-dom';

interface IForm {
    ACCESS_TOKEN: string
    ORG_ID: string
}

export default function Welcome() {
    const [form] = Form.useForm<IForm>()

    const navigate = useNavigate();

    const handleNextPage = () => {
        navigate('/database')
    }

    const handleCancel = () => {
        window.electronAPI.closeApp()
    }

    const handleFinishForm = (data: IForm) => {
        window.electronAPI.updateEnv(data)
        handleNextPage()
    }

    return (
        <RootLayout
            footer={
                <Flex justify='end' align='center' gap={8}>
                    <Button
                        size='small'
                        onClick={handleCancel}
                        variant='outlined'
                        color='default'
                    >
                        Cancelar
                    </Button>
                    <Button
                        size='small'
                        onClick={() => form.submit()}
                        variant='outlined'
                        color='primary'
                    >
                        Próximo
                    </Button>
                </Flex>
            }
        >
            <Row gutter={[8, 0]} style={{ height: '100%' }}>
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
                    <Flex
                        vertical
                        justify='space-between'
                        style={{ height: '100%' }}
                    >
                        <div>
                            <Typography.Title level={4}>
                                Bem vindo ao instalador do <i>Intraguard</i>
                            </Typography.Title>
                            <Typography.Paragraph style={{ fontSize: 14 }}>
                                Este assistente o guiará pelo processo de instalação e
                                configuração dos serviços do Intraguard. Ao finalizar,
                                o Intraguard v1.0 será instalado no seu computador.
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                Preencha o campo abaixo e clique em <i>Próximo</i> para
                                continuar, ou <i>Cancelar</i> para sair do instalador.
                            </Typography.Paragraph>
                        </div>
                        <div>
                            <Form
                                form={form}
                                onFinish={handleFinishForm}
                                layout='vertical'
                                size='small'
                                variant='filled'
                            >
                                <Form.Item
                                    required
                                    rules={[{ required: true }]}
                                    name={'ORG_ID'}
                                    label={'ID da organização:'}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    required
                                    rules={[{ required: true }]}
                                    name={'JWT_TOKEN'}
                                    label={'Token da organização:'}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                            <Alert
                                showIcon
                                type='warning'
                                message={'É necessário ter node v* ou superior instalado no seu computador.'}
                            />
                        </div>
                    </Flex>
                </Col>
            </Row>
        </RootLayout>
    )
}
