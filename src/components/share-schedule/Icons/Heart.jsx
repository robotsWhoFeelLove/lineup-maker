function Heart({ fillColor }) {
  return (
    <div>
      <svg width="40px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 48 60" x="0px" y="0px">
        <path
          fill={fillColor}
          d="M44.44,8V4.44H42V1.6H28.44V4.44H25.6V8H22.4V4.44H19.2V1.6H6V4.44H3.2V8H0V20.8H3.2v6.4H6v3.56h3.2V34H12.8V36.8H16V40h3.2v3.2h3.2v3.2h3.2V43.2h2.84V40H32V36.8h3.56V34H38.4v-3.2H42V27.2h2.48V20.8H48V8ZM16,8H9.6V20.44H6V8H9.6V4.44H16Z"
        />
      </svg>
    </div>
  );
}

export default Heart;
