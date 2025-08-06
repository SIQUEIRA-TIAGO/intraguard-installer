import { Button, Divider, Flex, Form, Input, Select } from 'antd'
import React from 'react'
import RootLayout from '../layout'
import { useNavigate } from 'react-router-dom';

interface IForm {
    DB_DATABASE: string
    DB_USER: string
    DB_PASSWORD: string
    DB_HOST: string
    DB_PORT: string
    DB_DIALECT: 'mysql' | 'mssql' | 'sqlite' | 'postgres' | 'oracle' | 'mariadb'
}

export default function SetupDatabase() {
    const navigate = useNavigate();
    const [form] = Form.useForm<IForm>()

    const handleNextPage = () => {
        navigate('/dir')
    }

    const handlePrevPage = () => {
        navigate('/')
    }

    const handleFinishForm = (data: IForm) => {
        window.electronAPI.updateEnv(data)
        handleNextPage()
    }

    return (
        <RootLayout
            header={{
                title: 'Informações do banco de dados',
                description: 'Por favor, preencha as informações de conexão com seu banco de dados.'
            }}
            footer={
                <Flex gap={8} justify='end' align='center'>
                    <Button
                        size='small'
                        color='default'
                        variant='outlined'
                        onClick={handlePrevPage}
                    >
                        Voltar
                    </Button>
                    <Button
                        size='small'
                        onClick={() => form.submit()}
                        color='primary'
                        variant='outlined'
                    >
                        Próximo
                    </Button>
                </Flex>
            }
        >
            <div style={{ padding: '8px 16px' }}>
                <Form
                    onFinish={handleFinishForm}
                    size='small'
                    form={form}
                    variant='filled'
                    layout='vertical'
                >
                    <Form.Item
                        required
                        rules={[{ required: true }]}
                        name={'DB_DIALECT'}
                        label={'Driver:'}
                        initialValue={'oracle'}
                    >
                        <Select options={[
                            { label: 'MySQL', value: 'mysql' },
                            { label: 'PostgreSQL', value: 'postgres' },
                            { label: 'SQLite', value: 'sqlite' },
                            { label: 'Oracle', value: 'oracle' },
                            { label: 'Microsoft SQL Server', value: 'mssql' },
                            { label: 'MariaDB', value: 'mariadb' }
                        ]} />
                    </Form.Item>
                    <Flex gap={8}>
                        <Form.Item
                            required
                            rules={[{ required: true }]}
                            labelCol={{ style: { padding: 0 } }}
                            style={{ width: '100%' }}
                            name={'DB_HOST'}
                            label={'Host:'}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            required
                            rules={[{ required: true }]}
                            initialValue={'1521'}
                            name={'DB_PORT'}
                            label={'Porta:'}
                        >
                            <Input />
                        </Form.Item>
                    </Flex>
                    <Form.Item
                        required
                        rules={[{ required: true }]}
                        name={'DB_DATABASE'}
                        label={'Banco de dados:'}
                    >
                        <Input />
                    </Form.Item>
                    <Divider />
                    <Form.Item
                        required
                        rules={[{ required: true }]}
                        name={'DB_USER'}
                        label={'Nome de usuário:'}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        required
                        rules={[{ required: true }]}
                        name={'DB_PASSWORD'}
                        label={'Senha:'}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </div>
        </RootLayout>
    )
}
