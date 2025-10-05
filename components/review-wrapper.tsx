"use client";

import { useEffect, useState } from "react";
import { fetchLodgeComments } from "@/lib/api";
import ReviewCard from "./cards/review-card";
import ReviewListModal from "./ui/review-list-modal";

export default function ReviewList({ lodgeId }: { lodgeId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string >("")

  useEffect(() => {
    fetchLodgeComments(lodgeId).then(setComments);
  }, [lodgeId]);

  if (comments.length === 0) return null;

  return (
    <>
      {comments.slice(0, 3).map((testimonial, indx) => (
        <ReviewCard
          testimonial={testimonial}
          key={indx}
          isUser={false}
          setShowDialog={setShowModal}
          showDialog={showModal}
          setSelectedId={setSelectedId}
        />
      ))}

      <ReviewListModal
        reviews={comments}
        id={lodgeId}
        selectedId={selectedId}
        setShowDialog={setShowModal}
        showDialog={showModal}
      />
    </>
  );
}
