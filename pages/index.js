import Link from 'next/link';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <Link href='/about'>About</Link>
    </Layout>
  );
};

export default HomePage;
