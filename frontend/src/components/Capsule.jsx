import PropTypes from "prop-types";

export default function Capsule({ capsule }) {
  return (
    <div className="capsule">
      <h2>{capsule.name}</h2>
      <p>{capsule.description}</p>
      <p>{(capsule.members ?? []).join(", ")}</p>
    </div>
  );
}

Capsule.propTypes = {
  capsule: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
