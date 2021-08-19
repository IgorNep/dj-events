import Layout from '@/components/Layout';
import { parseCookies } from '@/helpers/index';
import { API_URL } from 'config';
import DashboardEvent from '@/components/DashboardEvent';
import styles from '@/styles/Dashboard.module.css';
import router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

const DashboardPage = ({ events, token }) => {
  const deleteEvent = async (id) => {
    if (window.confirm('Ae you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <ToastContainer />
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent
            key={evt.id}
            evt={evt}
            handleDelete={deleteEvent}
          ></DashboardEvent>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
