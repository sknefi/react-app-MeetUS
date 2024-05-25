import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./EventGroupDiv.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ShowGroup from "../GroupInfo/ShowGroup";

import { EventContext } from "../../Technician/Contexts/EventContext";
import { LoggedUserContext } from "../../Technician/Contexts/LoggedUserContext";
import { ColorPalletContext } from "../../Technician/Contexts/ColorPalletContext";
import InfoAboutServer from "../../Technician/InfoAboutServer";

const EventGroupDiv = (props) => {
  const serverInfo = InfoAboutServer()
  const { colorPallet } = useContext(ColorPalletContext);
  const { groupp } = props;
  const [group, setGroup] = useState(groupp);

  const { handlerMap } = useContext(EventContext);
  const { loggedUser, handlerMapForUserUpdate } = useContext(LoggedUserContext);

  const [groupUsers, setGroupUsers] = useState([])

  useEffect(() => {
    const dataObject = {
      members: group.members
    }
    handlerMap
      .handleGetGroupUsers(dataObject)
      .then((groupData) => {
        setGroupUsers(groupData)
      })
      .catch((error) => {
        console.error("Error fetching event data:", error)
      })
  }, [])

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  //console.log(props)

  const handleDivClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const isUserLogged = () => {
    return Object.keys(loggedUser).length !== 0;
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const handleJoinGroup = () => {
    if (isUserLogged()) {
      handlerMap.handleAddUserToGroup(loggedUser.id, group.id);
      setGroup((current) => ({
        ...current,
        members: [...current.members, loggedUser.id],
      }));

      // aby sa pridaný user zobrazil hneď v dive - fotka usera
      setGroupUsers((current) => [...current, loggedUser])

      handlerMapForUserUpdate.handleInkrementUserStreak();
      setModalOpen(false);
    } else {
      setModalOpen(false);
      redirectToLogin();
    }
  };

  return (
    <>
      <div className="clickable-event-web-div" onClick={handleDivClick}>
        <div
          className="all-event-web-div"
          style={{ border: `2px solid ${colorPallet.maincolor}` }}
        >
          <div
            className="left-event-name"
            style={{ color: `${colorPallet.fourthcolor}` }}
          >
            {group.name}
          </div>
          <div
            className="mid-event-count-members"
            style={{
              color: `${colorPallet.fourthcolor}`,
              borderRight: `2px solid ${colorPallet.maincolor}`,
              borderLeft: `2px solid ${colorPallet.maincolor}`,
            }}
          >
            {group.members ? group.members.length : 1} /{" "}
            {group.maxMembers === "Infinity" ? "∞" : group.maxMembers}
          </div>
          <div className="right-event-members">
            {/*potrebujeme zmapovat array a pridat user.photo pre hodnotu (user.id) */}
            {groupUsers &&
              groupUsers.map((user, index) => {
                //console.log(user)
                return (
                  <img
                    src={user ? `${serverInfo.userPhotosPath}/${user.photo}` : ''}
                    alt=""
                    className="user-photo-in-div"
                    key={index}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <Modal
        show={modalOpen}
        onHide={closeModal}
        size="xl"
        style={{ color: `${colorPallet.fourthcolor}` }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: `${colorPallet.secondarycolor}`,
            borderLeft: `.5px solid ${colorPallet.fourthcolor}`,
            borderRight: `.5px solid ${colorPallet.fourthcolor}`,
            borderTop: `.5px solid ${colorPallet.fourthcolor}`,
          }}
        >
          <Modal.Title style={{ fontSize: "3rem" }}>{group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: `${colorPallet.secondarycolor}`,
            borderLeft: `.5px solid ${colorPallet.fourthcolor}`,
            borderRight: `.5px solid ${colorPallet.fourthcolor}`,
          }}
        >
          {/*  */}
          <p>{group.info}</p>

          <ShowGroup groupMembers={groupUsers} />
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: `${colorPallet.secondarycolor}`,
            borderLeft: `.5px solid ${colorPallet.fourthcolor}`,
            borderRight: `.5px solid ${colorPallet.fourthcolor}`,
            borderBottom: `.5px solid ${colorPallet.fourthcolor}`,
          }}
        >
          {/* v skupine je ešte miesto (nie je plná) a prihlásený user sa nenachádza v skupine */}
          {/* tu sa deje mágia, ktorej nerozumie ani chatgpt. takto to funguje tak NEPREPISOVAŤ */}
          {group !== undefined &&
            Object.keys(group).length !== 0 &&
            group.maxMembers > (group.members ? group.members.length : 1) &&
            group.members &&
            !group.members.includes(loggedUser.id) && (
              <Button
                variant="primary"
                onClick={handleJoinGroup}
                style={{
                  backgroundColor: `${colorPallet.maincolor}`,
                  color: `${colorPallet.fourthcolor}`,
                }}
              >
                PRIDAŤ SA
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventGroupDiv;
