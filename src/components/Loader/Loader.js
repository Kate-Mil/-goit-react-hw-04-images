import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    // <LoaderStyle>
    <ThreeDots
      height="80"
      width="80"
      radius="10"
      color="#ff5474"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: 'auto' }}
      wrapperClassName=""
      visible={true}
    />
    // </LoaderStyle>
  );
}
