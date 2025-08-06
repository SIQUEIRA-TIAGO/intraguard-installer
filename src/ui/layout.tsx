import React, { PropsWithChildren, ReactNode } from 'react'
import { Divider, Flex, Image, Layout, Typography } from 'antd';
import iso from './assets/intraguard-iso.png'

const { Footer, Content } = Layout;

export default function RootLayout(
    {
        children,
        header,
        footer
    }: PropsWithChildren<{
        header?: { title: string, description?: string }
        footer?: ReactNode,
    }>
) {
    return (
        <Layout
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Content style={{ height: '100%', padding: 8 }}>
                {
                    header && <Flex gap={8} justify='start' align='center'>
                        <Image
                            preview={false}
                            src={iso}
                            height={60}
                            width={60}
                        />
                        <div>
                            <Typography.Title level={4}>
                                {header.title}
                            </Typography.Title>
                            <Typography.Text style={{fontSize: 14}}>
                                {header.description}
                            </Typography.Text>
                        </div>
                    </Flex>
                }
                {children}
            </Content>
            <Divider
                plain
                orientation='left'
                size='small'
                style={{ margin: 0, color: 'rgba(5,5,5,0.06)' }}
            >
                Intraguard v1.0
            </Divider>
            {footer && <Footer style={{ padding: '0 8px 8px' }}>{footer}</Footer>}
        </Layout>
    )
}
