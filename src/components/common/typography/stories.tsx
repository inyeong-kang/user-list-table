import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { ReactNode } from 'react';

import { Typography } from './index';

const meta = {
    title: 'Common/Typography',
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Row = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const Label = styled.span`
    min-width: 100px;
    color: #666;
    font-size: 14px;
`;

interface StoryTemplateProps {
    label: string;
    children: ReactNode;
    background?: string;
}

const StoryTemplate = ({ label, children, background }: StoryTemplateProps) => (
    <Row>
        <Label>{label}</Label>
        {background ? (
            <div style={{ background, padding: '4px 8px' }}>{children}</div>
        ) : (
            children
        )}
    </Row>
);

export const Default: StoryObj = {
    render: () => (
        <Container>
            <StoryTemplate label="Heading5">
                <Typography variant="heading5">
                    제목 텍스트입니다 (16px, 600)
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Title">
                <Typography variant="title">
                    강조 텍스트입니다 (14px, 600)
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Content">
                <Typography variant="content">
                    일반 텍스트입니다 (14px, 400)
                </Typography>
            </StoryTemplate>
        </Container>
    ),
};

export const Colors: StoryObj = {
    render: () => (
        <Container>
            <StoryTemplate label="Primary">
                <Typography variant="title" color="primary">
                    Primary 색상 텍스트
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Secondary">
                <Typography variant="title" color="secondary">
                    Secondary 색상 텍스트
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Error">
                <Typography variant="title" color="error">
                    Error 색상 텍스트
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="White" background="#333">
                <Typography variant="title" color="white">
                    White 색상 텍스트
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Gray">
                <Typography variant="title" color="gray">
                    Gray 색상 텍스트
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Text Default">
                <Typography variant="title" color="text-default">
                    기본 텍스트 색상
                </Typography>
            </StoryTemplate>
            <StoryTemplate label="Text Disabled">
                <Typography variant="title" color="text-disabled">
                    비활성화된 텍스트 색상
                </Typography>
            </StoryTemplate>
        </Container>
    ),
};

export const DifferentElements: StoryObj = {
    render: () => (
        <Container>
            <StoryTemplate label='as="div"'>
                <Typography variant="heading5" as="div">
                    div로 렌더링된 제목
                </Typography>
            </StoryTemplate>
            <StoryTemplate label='as="span"'>
                <Typography variant="title" as="span">
                    span으로 렌더링된 강조 텍스트
                </Typography>
            </StoryTemplate>
        </Container>
    ),
};
