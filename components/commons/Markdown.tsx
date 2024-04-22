import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const StyledReactMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 8px;

  p,
  ul,
  ol {
    margin: 0;
  }

  ul > li {
    margin: -8px;
  }

  blockquote {
    /* remove extra space on top & bottom */
    margin: 0;
    line-height: 0;

    & > p {
      line-height: 1.5rem;

      /* no need to display the extra "" */
      &::before,
      &::after {
        display: none;
      }
    }
  }
`;

export const Markdown = ({ children }: { children: string }) => (
  <StyledReactMarkdown remarkPlugins={[remarkGfm]}>{children}</StyledReactMarkdown>
);
