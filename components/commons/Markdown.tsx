import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

const StyledReactMarkdown = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 8px;

  p {
    margin: 0;
  }

  hr {
    margin: 5px 0;
  }

  ul,
  ol {
    margin: 0;
    /* margin-bottom: -20px; */
  }

  ul > li,
  ol > li {
    margin: -8px;

    & > p {
      margin-top: -20px;
      margin-bottom: -10px;
    }
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

  /* dark mode */
  @media (prefers-color-scheme: dark) {
    strong {
      color: #a7f4ee;
      text-decoration: underline;
    }
  }
`;

export const Markdown = ({ children }: { children: string }) => (
  <StyledReactMarkdown remarkPlugins={[remarkGfm]}>{children}</StyledReactMarkdown>
);
