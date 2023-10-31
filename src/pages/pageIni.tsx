import { useFetchUsers } from '@/services/inicial';

function FetchUsers() {
  const { isLoading, error, data } = useFetchUsers();

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + (error as Error).message;

  return <div>{data}</div>;
}

function PageIni() {
  return <FetchUsers />;
}

export default PageIni;
