import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const FancyDocForm: React.FC = () => (
    <>
        <TextArea showCount maxLength={100} onChange={onChange} />
    </>
);

export default FancyDocForm;