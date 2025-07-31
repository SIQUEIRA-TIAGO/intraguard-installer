import React, { useEffect, useState } from 'react'
import RootLayout from '../layout'
import { Button, Flex, Result, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Instalation() {
    const navigate = useNavigate()

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!loading)
            handleInstall()
    }, [])

    const handleInstall = async () => {
        if (!loading) {
            setLoading(true)
            const success = await window.electronAPI.cloneRepo()
            if (success) {
                navigate('/complete')
            } else {
                setError(true)
            }
        }
    }

    const handleClose = () => {
        window.electronAPI.closeApp()
    }

    return (
        <RootLayout
            header={{
                title: 'Instalando serviços',
                description: 'Aguarde enquanto instalamos os serviços do sistema no seu computador.'
            }}
        >
            <Flex justify='center' align='center' style={{ height: '100%' }}>
                {
                    error ? <Result
                        status="error"
                        title="A instalação falhou"
                        subTitle="Por favor, cheque os dados inseridos e tente novamente, ou entre em contato com nossa equipe."
                        extra={[
                            <Button onClick={handleClose}>Cancelar</Button>,
                        ]}
                    />
                        : <Spin />
                }
            </Flex>
        </RootLayout>
    )
}
