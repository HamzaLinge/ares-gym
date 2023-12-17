import "./globals.css";

export const metadata = {
  title: "Ares Gym",
  description:
    "Ares Gym à Mostaganem : Musculation de Qualité avec Hamza HAMDOUD | Équipement de Pointe, Espace de Repos, Sonorisation Motivante " +
    "Découvrez Ares Gym, la référence en salle de musculation à Mostaganem, dirigée par Hamza HAMDOUD. Notre salle spacieuse de 330 mètres carrés est équipée d'installations haut de gamme pour vous offrir une expérience d'entraînement exceptionnelle. " +
    "Nos équipements modernes comprennent des haltères, des machines de pointe, des tapis roulants, des bancs et bien plus encore. Chaque coin de notre salle est méticuleusement entretenu, offrant un environnement optimal pour vos séances de musculation. En plus des équipements, nous offrons un espace de repos pour récupérer et des compléments alimentaires de qualité à votre disposition. " +
    "Plongez-vous dans vos séances d'entraînement avec notre système de sonorisation de qualité, conçu pour vous motiver et vous immerger dans une ambiance énergique. Les passionnés de musculation apprécieront l'atmosphère dynamique et les décibels stimulants. " +
    "Après votre séance, détendez-vous avec une douche rafraîchissante dans nos installations modernes. Chez Ares Gym, nous vous offrons bien plus qu'une simple salle de musculation – nous créons une expérience holistique pour votre bien-être physique et mental. " +
    "Rejoignez-nous à Ares Gym et découvrez comment nous élevons le niveau de vos séances d'entraînement. Réservez dès maintenant et découvrez le potentiel qui réside en vous.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          "scrollbar scrollbar-track-zinc-200 scrollbar-thumb-zinc-500 scrollbar-thumb-rounded-md scrollbar-w-2 md:scrollbar-w-4"
        }
      >
        {children}
      </body>
    </html>
  );
}
