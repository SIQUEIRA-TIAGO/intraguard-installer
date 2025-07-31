import { Button, Divider, Flex, Input, Typography } from 'antd'
import React, { useState } from 'react'
import RootLayout from '../layout'
import { useNavigate } from 'react-router-dom';

export default function ChooseDir() {
    const navigate = useNavigate();
    const [targetDir, setTargetDir] = useState<string | null>(null)

    const handleGetTargetDirectory = () => {
        window.electronAPI.chooseDir().then(result => setTargetDir(result))
    }

    const handleInstallRepository = () => {
        navigate('/instalation')
    }

    const handlePrevPage = () => {
        navigate('/database')
    }

    return (
        <RootLayout
            header={{
                title: 'Selecione o local de destino',
                description: 'Selecione o local de destino onde o serviço será instalado.'
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
                        onClick={handleInstallRepository}
                        color='primary'
                        variant='outlined'
                        disabled={!targetDir}
                    >
                        Instalar
                    </Button>
                </Flex>
            }
        >
            <div style={{ padding: '8px 16px' }}>
                <Typography.Text>
                    Os arquivos serão instalados na pasta na seguinte pasta.
                    Para iniciar a instalação clique em Instalar, se quiser
                    selecionar uma pasta diferente clique em Procurar.
                </Typography.Text>
                <Divider
                    plain
                    style={{ marginBottom: 0, fontSize: 12 }}
                    orientation='left'
                >
                    Pasta destino
                </Divider>
                <Input.Search
                    variant='filled'
                    size='small'
                    value={targetDir ?? undefined}
                    readOnly
                    enterButton="Procurar"
                    placeholder="Clique em Procurar para encontrar uma pasta..."
                    onSearch={handleGetTargetDirectory}
                />
            </div>
        </RootLayout>
    )
}
