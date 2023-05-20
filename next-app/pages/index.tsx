import {gql, useQuery} from "@apollo/client";
import type {GetStaticProps, NextPage} from "next";
import HomePageHead from "../components/head/homePageHead";
import {initializeApollo} from "../lib/apolloClient";
import styles from "../styles/Home.module.css";
import LaunchCard from "../components/launchCard";

const GET_LAUNCHES_QUERY = gql`
  query GetLaunches {
    launchesPast {
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
      links {
        flickr_images
        mission_patch_small
      }
      launch_success
      launch_site {
        site_name
      }
      details
    }
  }
`;

export interface Launch {
  mission_name: string;
  launch_date_local: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    flickr_images: string[];
    mission_patch_small: string;
  };
  launch_success: boolean;
  launch_site: {
    site_name: string;
  };
  details: string;
}


const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES_QUERY);

  if (error) return <>{"An error occured fetching data"}</>;
  if (loading) return <>{"Loading"}</>;

  const launches: Launch[] = data.launchesPast;

  return (
    <div className={styles.container}>
      <HomePageHead />
      <div>
        {launches.map((launch) => (
          <LaunchCard
            key={launch.mission_name}
            launch={launch}
          />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({query: GET_LAUNCHES_QUERY});

  return {
    props: {},
  };
};

export default Home;
