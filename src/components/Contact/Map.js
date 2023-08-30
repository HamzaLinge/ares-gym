import React from "react";

function Map() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3231.128425613849!2d0.074328875378372!3d35.919356416857134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128203385f572c69%3A0xf986e24fd2abd7a6!2sAres%20Gym!5e0!3m2!1sen!2suk!4v1693310794033!5m2!1sen!2suk"
      // width="400"
      // height="300"
      className={"h-72 w-full max-w-xl rounded-lg border-2 border-zinc-600"}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default Map;
