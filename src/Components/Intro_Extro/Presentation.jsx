import React from "react";

const Presentation = () => {
  return (
    <div className="container ">
      <div className="content">
        <div className="header   flex gap-40 p-6 ">
          <div
            className="fs-5 "
            style={{ fontSize: "18px", fontWeight: "700" }}
          >
            Presentation and Grooming
          </div>
          <div
            className="fw-bold bg-white  p-5"
            style={{ borderRadius: "20px" }}
          >
            <span
              style={{
                color: "#00BF63",
                fontSize: "24px",
                fontWeight: "700",
                paddingLeft: "10px",
              }}
            >
              8/10
            </span>
            <p
              className="fs-6"
              style={{ color: "#464545", fontWeight: "700", fontSize: "12px" }}
            >
              Overall Score
            </p>
          </div>
        </div>
        <div className="pcontainer ">
          <div>
            <span
              style={{
                color: "#FF5F57",
              }}
            >
              3/10
            </span>
            <p>Eye contact</p>
            <div>
              Arpitha could benefit from maintaining more consistent eye
              contact, which can establish trust and foster a sense of
              connection with the interviewer.
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#00BF63",
              }}
            >
              8/10
            </span>
            <p>Posture</p>
            <div>
              While mostly upright and engaged, there were moments of slouching
              which could indicate a lack of confidence or interest.
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#00BF63",
              }}
            >
              6/10
            </span>
            <p>Grooming</p>
            <div>
              Arpitha was well-dressed and professional, in line with Deloitte's
              standards.
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#FF5F57",
              }}
            >
              2/10
            </span>
            <p>Hand Gestures</p>
            <div>
              Hand gestures can add value to verbal communication, but excessive
              or nervous gesturing can be distracting. Arpitha should aim for
              balanced and meaningful hand movements to underline key points.
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#00BF63",
              }}
            >
              8/10
            </span>
            <p>Facial Expressions</p>
            <div>
              Arpitha has a pleasant facial expression that indicates her
              interest and engagement in the conversation. However she could
              benefit from more expressive reactions to reflect understanding or
              agreement with the interviewer.{" "}
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#FF914D",
              }}
            >
              6/10
            </span>
            <p>Background and Lighting</p>
            <div>
              The background was clean and uncluttered, which is ideal for a
              video interview. However, lighting could be improved. Frontal,
              soft lighting will reduce shadows and make the candidate more
              clearly visible.
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#00BF63",
              }}
            >
              9/10
            </span>
            <p>Audio Quality</p>
            <div>
              The audio was clear and without significant background noise,
              which is essential for effective communication during the
              interview.
            </div>
          </div>
          <div>
            <span
              style={{
                color: "#00BF63",
              }}
            >
              10/10
            </span>
            <p>Device Position</p>
            <div>
              The device from which Arpitha was conducting the interview was
              placed at a proper angle, allowing a clear view of her face and
              upper body. This is critical for non-verbal communication.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
