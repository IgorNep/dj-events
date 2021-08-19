import { ToastContainer, toast } from 'react-toastify';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import { useRouter } from 'next/router';
import { parseCookies } from '@/helpers/index';

const EventPage = ({ evt, token }) => {
  const router = useRouter();
  const deleteEvent = async () => {
    if (window.confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt />
              Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('uk-UA')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
              alt='image'
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <EventMap evt={evt} />
        <Link href='/events'>
          <a className={styles.back}>{'< '}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query: { slug }, req }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  const { token } = parseCookies(req);
  return {
    props: {
      evt: events[0],
      token,
    },
  };
}

export default EventPage;
