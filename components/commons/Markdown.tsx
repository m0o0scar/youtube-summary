import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const StyledReactMarkdown = styled(ReactMarkdown)`
  all: initial;
  color: rgba(31, 41, 55, 0.8);
  font-size: 14px;
  font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol', 'Noto Color Emoji';

  * {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const Markdown = ({ children }: { children: string }) => (
  <StyledReactMarkdown remarkPlugins={[remarkGfm]}>{children}</StyledReactMarkdown>
);
