import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { TimelineType } from "../../types/Types";
import {
  GET_TIMELINE,
  GET_TIMELINE_USER,
  LIKE_PUBLICATION,
  TIMELINE_SUBSCRIPTION,
} from "../../utils/queries";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import PostStatus from "./PostStatus";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TimelineProfile = ({ userId }) => {
  const { t, i18n } = useTranslation("home");
  const { user, token } = useSelector((state: any) => state.auth);
  const [timeline, setTimeline] = useState<TimelineType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(8);

  const {
    data: timelineData,
    loading: loadingData,
    fetchMore,
    refetch,
  } = useQuery(GET_TIMELINE_USER, {
    variables: { offset: 0, limit: 8, userId: parseInt(userId) },
    onError: (error) => {},
    onCompleted(data) {
      setTimeline(data.userTimeline);
    },
  });

  const { data, loading } = useSubscription(TIMELINE_SUBSCRIPTION, {
    variables: { userId: parseInt(user.id) },
    onData: (data: any) => {
      refetch();
    },
  });

  const [likePost, unlikePost] = useMutation(LIKE_PUBLICATION, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const likePostHandler = (id: string) => {
    likePost({
      variables: {
        publicationId: parseInt(id),
      },
    });
  };

  const fetchMoreTimeline = async () => {
    const lastTimelineIndex = timeline.length - 1;
    const fetchedMore = await fetchMore({
      variables: { offset: lastTimelineIndex, limit: 8 },
    });

    if (fetchedMore) {
      const newPosts = fetchedMore.data.userTimeline;

      setTimeline((previousPosts) => [...previousPosts, ...newPosts]);

      if (newPosts.length === 0) {
        setHasMore(false);
      }
    }
  };

  return (
    <>
      {timeline.length > 0 ? (
        <InfiniteScroll
          dataLength={timeline.length}
          next={fetchMoreTimeline}
          hasMore={hasMore}
          loader={
            <div>
              <Skeleton height={100} />
              <Skeleton height={50} />
              <Skeleton height={100} />
              <Skeleton height={50} />
              <Skeleton height={200} />
              <Skeleton height={50} />
              <Skeleton height={100} />
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={100} />
              <Skeleton height={30} />
              <Skeleton height={30} />
              <Skeleton height={30} />
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Ya estás al día!</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={refetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
          scrollThreshold={0}
        >
          {timeline.map((timeline: TimelineType, index: number) => {
            return timeline.publication?.type === "STATUS" ? (
              <PostStatus
                likeCount={timeline.publication._count.PublicationLikes}
                author={timeline.publication.user}
                contents={timeline.publication.contents}
                key={`STATUS-${index}`}
                postId={timeline.publication.id}
                onClickLikePost={likePostHandler}
              />
            ) : null;
          })}
        </InfiniteScroll>
      ) : (
        <div className="p-7 flex mx-auto flex-col">
          <div className="mx-auto flex flex-col">
            <span className="title text-center">{t("no_publications")}</span>
            <Link to={"/peoples"} className="mx-auto">
              <button className="btn-main mt-2 ">{t("explore")}</button>
            </Link>
            <img
              src="/assets/img/not_found.png"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TimelineProfile;
