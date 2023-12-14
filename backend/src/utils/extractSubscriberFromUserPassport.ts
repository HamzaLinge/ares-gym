import { Profile } from "passport";

type TFullName = {
  firstName: string;
  lastName: string;
};

// function extractNamesFromDisplayName(displayName: string): TFullName {
//   const names = displayName.split(" ");
//   return {
//     firstName: names.slice(0, names.length - 2).join(" "),
//     lastName: names[names.length - 1],
//   };
// }
//
// export function extractSubscriberFromUserPassport(profile: Profile) {
//   let fullName: TFullName;
//   if (profile.name.familyName && profile.name.givenName) {
//     fullName.lastName = profile.name.familyName;
//     fullName.firstName = profile.name.givenName;
//   } else {
//     fullName = extractNamesFromDisplayName(profile.displayName);
//   }
//   let email: string;
//   if (profile.emails) email = profile.emails[1].value;
//   else email = "";
//   let picture: string;
//   if (profile.photos) picture = profile.photos[1].value;
//   else picture = "";
//   return {
//     credentialsProvider: {
//       provider:
//         profile.provider.charAt(0).toUpperCase() + profile.provider.slice(1),
//       id: profile.id,
//     },
//
//     email: email,
//     password: "undefined",
//
//     firstName: fullName.firstName,
//     lastName: fullName.lastName,
//     phoneNumber: "+2137777777",
//     gender: "Unknown",
//
//     birthday: "2023-11-09",
//     picture: picture,
//   };
// }
