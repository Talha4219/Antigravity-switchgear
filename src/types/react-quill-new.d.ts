declare module 'react-quill-new' {
    import React from 'react';

    export interface ReactQuillProps {
        theme?: string;
        modules?: any;
        formats?: string[];
        value?: string;
        onChange?: (value: string, delta: any, source: string, editor: any) => void;
        placeholder?: string;
        id?: string;
        className?: string;
        style?: React.CSSProperties;
        readOnly?: boolean;
        bounds?: string | HTMLElement;
        scrollingContainer?: string | HTMLElement;
        preserveWhitespace?: boolean;
    }

    export default class ReactQuill extends React.Component<ReactQuillProps> { }
}
