import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/Layout';
const EventPage = () => {
  const router = useRouter();

  console.log(router);
  return (
    <Layout>
      <h2>My event</h2>
      <h3>{router.query.slug}</h3>
      <button onClick={() => router.push('/')}>Click</button>
    </Layout>
  );
};

export default EventPage;
