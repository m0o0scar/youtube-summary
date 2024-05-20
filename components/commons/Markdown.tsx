import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const StyledReactMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  padding: 0 0 8px 0;
  gap: 8px;

  & > *,
  ul,
  ol,
  blockquote {
    margin: 0 !important;
  }

  pre {
    white-space: pre-wrap;
  }

  hr {
    margin: 5px 0;
  }

  li {
    margin: -8px;

    & > p {
      margin-top: -20px;
      margin-bottom: -10px;
    }
  }

  code {
    background-color: rgba(0, 0, 0, 0.1);
  }

  blockquote {
    line-height: 0;

    & > p {
      margin: 0 !important;
      line-height: 1.5rem;

      /* no need to display the extra "" */
      &::before,
      &::after {
        display: none;
      }
    }
  }

  /* dark mode */
  @media (prefers-color-scheme: dark) {
    strong {
      color: #a7f4ee;
      text-decoration: underline;
    }

    code {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const Markdown = ({ children }: { children: string }) => (
  <StyledReactMarkdown remarkPlugins={[remarkGfm]}>{children}</StyledReactMarkdown>
);
