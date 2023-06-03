// SubscriptionComponent.tsx

import { useSubscription, gql } from "@apollo/client";

const TIMELINE_SUBSCRIPTION = gql`
  subscription Subscription($userId: Int!) {
    postCreated(userId: $userId) {
      postId
    }
  }
`;

interface SubscriptionComponentProps {
  userId: number;
  onSubscriptionData: () => void;
}

const SubscriptionComponent: React.FC<SubscriptionComponentProps> = ({ userId, onSubscriptionData }) => {
  useSubscription(TIMELINE_SUBSCRIPTION, {
    variables: {
      userId: userId,
    },
    onSubscriptionData: onSubscriptionData,
  });

  return null;
};

export default SubscriptionComponent;
