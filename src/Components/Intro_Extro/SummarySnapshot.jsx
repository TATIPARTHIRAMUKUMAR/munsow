import React from "react";

const SummarySnapshot = () => {
  const completionPercentage = 20;

  return (
    <div className="summarycontainer  ">
      <div className="pt-5  scontent  ">
        <div className="row">
          <div className="mb-5  headtitle">Summary Snapshot</div>

          <div className="col-md-6 flex gap-20 overallscore">
            <div className=" p-3">
              {" "}
              <span
                className="fw-bold "
                style={{
                  color: "#FF5F57",
                  fontSize: "24px",
                  fontWeight: "700",
                  paddingLeft: "50px",
                }}
              >
                2/10
              </span>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#464545",
                }}
              >
                Overall Readiness Score
              </p>
            </div>
            <div className=" mt-3">
              <span
                className="fw-bold"
                style={{
                  color: "#00BF63",
                  fontSize: "24px",
                  fontWeight: "700",
                  paddingLeft: "50px",
                }}
              >
                9/10
              </span>{" "}
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#464545",
                }}
              >
                Presentation and Grooming
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <p
              className=" text-center s-title p-1"
              style={{ backgroundColor: "#212E3E", color: "white" }}
            >
              Munsow Interview Classification Highlights
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div style={{ backgroundColor: "#EDE3F0", borderRadius: "15px" }}>
            <div className="d-flex flex-column flex-md-row gap-10">
              <div className="flex gap-40 ">
                <p
                  className="mt-4 ml-10 "
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#464545",
                  }}
                >
                  Behavioural Analysis
                </p>

                <div
                  className="mt-5  mr-2"
                  style={{
                    width: "25%",
                    height: "10px",
                    backgroundColor: " #f1f4f5",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${completionPercentage}%`,
                      height: "100%",
                      backgroundColor: "#FF5F57",
                      borderRadius: "inherit",
                      position: "absolute",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="behavioural">
              <div className="flex col-md-6 gap-20">
                <div className="fw-bold  d-flex gap-5 ">
                  <span
                    style={{
                      color: "#FF5F57",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    2/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Resilience
                  </a>
                </div>
                <div className="fw-bold d-flex gap-5">
                  <span
                    style={{
                      color: "#FF914D",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    7/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Teamwork
                  </a>
                </div>
              </div>
              <div className="flex col-md-6 gap-20 mt-8">
                <div className="fw-bold">
                  <span
                    style={{
                      color: "#00BF63",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    9/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Adaptability
                  </a>
                </div>
                <div className="d-flex">
                  <span
                    style={{
                      color: "#FF5F57",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "34px",
                    }}
                  >
                    5/10
                  </span>

                  <a
                    href="#"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Initiative
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div style={{ backgroundColor: "#D0E2CC", borderRadius: "15px" }}>
            <div className="d-flex flex-column flex-md-row gap-10">
              <div className="flex gap-40 ">
                <p
                  className="mt-4 ml-10 "
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#464545",
                  }}
                >
                  Technical Knowledge
                </p>
                <div
                  className="mt-5  mr-2"
                  style={{
                    width: "25%",
                    height: "10px",
                    backgroundColor: " #f1f4f5",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${completionPercentage}%`,
                      height: "100%",
                      backgroundColor: "#FF5F57",
                      borderRadius: "inherit",
                      position: "absolute",
                    }}
                  ></div>
                </div>{" "}
              </div>
            </div>
            <div className="behavioural">
              <div className="flex col-md-6 gap-20">
                <div className="fw-bold  d-flex gap-5 ">
                  <span
                    style={{
                      color: "#FF5F57",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    2/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    technical Skills
                  </a>
                </div>
                <div className="fw-bold d-flex gap-5">
                  <span
                    style={{
                      color: "#FF914D",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "20px",
                    }}
                  >
                    7/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Teamwork
                  </a>
                </div>
              </div>
              <div className="flex col-md-6 gap-20 mt-8">
                <div className="fw-bold">
                  <span
                    style={{
                      color: "#00BF63",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    9/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Adaptability
                  </a>
                </div>
                <div className="d-flex">
                  <span
                    style={{
                      color: "#FF5F57",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "34px",
                    }}
                  >
                    5/10
                  </span>

                  <a
                    href="#"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Initiative
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style={{ backgroundColor: "#F9DDB9", borderRadius: "15px" }}>
            <div className="d-flex flex-column flex-md-row gap-10">
              <div className="flex gap-40 ">
                <p
                  className="mt-4 ml-10 mr-5  "
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#464545",
                  }}
                >
                  Practical Thinking
                </p>

                <div
                  className="mt-5  mr-2"
                  style={{
                    width: "25%",
                    height: "10px",
                    backgroundColor: " #f1f4f5",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${completionPercentage}%`,
                      height: "100%",
                      backgroundColor: "#FF5F57",
                      borderRadius: "inherit",
                      position: "absolute",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="behavioural">
              <div className="flex col-md-6 gap-20">
                <div className="fw-bold  d-flex gap-5 ">
                  <span
                    style={{
                      color: "#FF5F57",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    2/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Resilience
                  </a>
                </div>
                <div className="fw-bold d-flex gap-5">
                  <span
                    style={{
                      color: "#FF914D",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    7/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Teamwork
                  </a>
                </div>
              </div>
              <div className="flex col-md-6 gap-20 mt-8">
                <div className="fw-bold">
                  <span
                    style={{
                      color: "#00BF63",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "50px",
                    }}
                  >
                    9/10
                  </span>

                  <a
                    href="#"
                    className="me-3"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Adaptability
                  </a>
                </div>
                <div className="d-flex">
                  <span
                    style={{
                      color: "#FF5F57",
                      fontSize: "16px",
                      fontWeight: "700",
                      paddingLeft: "34px",
                    }}
                  >
                    5/10
                  </span>

                  <a
                    href="#"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#464545",
                      paddingLeft: "5px",
                      textDecoration: "underline",
                    }}
                  >
                    Initiative
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySnapshot;
