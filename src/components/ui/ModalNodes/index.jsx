import { ModalContext } from "@/context/AppProvider";
import React, { useContext } from "react";
import ButtonModal from "../ButtonModal";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const ModalNodes = ({ onAddNode }) => {
  const { isVisible } = useContext(ModalContext);
  return (
    <>
      {isVisible && (
        <div className="modal-nodes">
          <div>
            <div className="">
              <p className="">Apps</p>
              <ButtonModal
                onClick={() =>
                  onAddNode("whatsapp", "WhatsApp", "#20c707", faWhatsapp)
                }
                icon={faWhatsapp}
                color={"#20c707"}
                content={"WhatsApp"}
              />
               <ButtonModal
                onClick={() =>
                  onAddNode("virtual assistant", "Virtual assistant", "#10A37F",  faRobot)
                }
                icon={faRobot}
                color={"#10a37f"}
                content={"Assistente Virtual"}
              />
            </div>

            <div className="">
              <p className="">Internal</p>
            </div>
            <ButtonModal
              onClick={() => onAddNode("trigger", "Trigger", "#FF9914", faBolt)}
              color={"#FF9914"}
              icon={faBolt}
              content={"Gatilho"}
            />

            <ButtonModal
              onClick={() => onAddNode("action", "Action", "#08BDBD", faGear)}
              icon={faGear}
              color={"#08BDBD"}
              content={"Ação"}
            />

            <ButtonModal
              onClick={() => onAddNode("delay", "Delay", "#636363", faClock)}
              icon={faClock}
              color={"#636363"}
              content={"Atraso"}
            />

            <ButtonModal
              onClick={() =>
                onAddNode("condition", "Condition", "#F0A202", faQuestion)
              }
              icon={faQuestion}
              color={"#F0A202"}
              content={"Condição"}
            />
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default ModalNodes;
