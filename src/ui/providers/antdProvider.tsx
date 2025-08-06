import { ConfigProvider } from 'antd'
import React, { PropsWithChildren } from 'react'

export default function AntdProvider({ children }: PropsWithChildren) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontSizeSM: 12,
                    fontFamilyCode: '"Montserrat", sans-serif',
                    colorText: '#262626',
                    colorBgBase: '#F1F4F4',
                },
                components: {
                    Typography: {
                        fontSize: 12,
                        titleMarginBottom: 0,
                    },
                    Form: {
                        itemMarginBottom: 12,
                        labelFontSize: 12,
                        verticalLabelPadding: 0,
                    },
                    Button: {
                        contentFontSizeSM: 12,
                    },
                    Input: {
                        inputFontSizeSM: 12,
                    },
                    Select: {
                        optionFontSize: 12,
                        fontSize: 12
                    },
                    Alert: {
                        fontSize: 12,
                    }
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}
