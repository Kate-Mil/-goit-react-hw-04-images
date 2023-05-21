import { LoadMoreBnt } from './Button.styled';
export default function Button({ onClick }) {
  return (
    <LoadMoreBnt type="button" onClick={onClick}>
      Load More
    </LoadMoreBnt>
  );
}
