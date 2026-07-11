import PropTypes from "prop-types";

import Capsule from "./Capsule.jsx";

export default function CapsulesList({ capsules }) {
  return (
    <div className="capsules-list">
      {capsules &&
        capsules.map((capsule) => (
          <Capsule key={capsule.id} capsule={capsule} />
        ))}
    </div>
  );
}

CapsulesList.propTypes = {
  capsules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};
