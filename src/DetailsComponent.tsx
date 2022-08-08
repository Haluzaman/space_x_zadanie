import {useNavigate, useSearchParams} from 'react-router-dom';
import YouTubeProps from "react-youtube";
import YouTube from "react-youtube";
import {useQuery} from "urql";
import React from "react";

const QUERY = `
query launchesPast($id: ID!){
  launch(id: $id) {
    mission_name,
    links {
        video_link
    }
  }
}
`;

export const DetailsComponent = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [{ fetching, data }] = useQuery({
        query: QUERY,
        variables: { id }
    });

    if (fetching) {
        return <p>`Loading ${id}...`</p>;
    }

    const youtubeLink : String = data?.launch?.links.video_link;
    const ytId : string = youtubeLink.replace("https://youtu.be/", "");
    const missionName : string = data?.launch?.mission_name;

    // @ts-ignore
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    }

    // @ts-ignore
    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
            <>
                <header>
                    <h1 style={{ textAlign : 'center' }}>{missionName}</h1>
                </header>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <button onClick={() => navigate(`/`)}>Home</button>
                    <YouTube
                        videoId={ytId}
                        opts={opts}
                        onReady={onPlayerReady} />
                </div>
            </>
        )
}