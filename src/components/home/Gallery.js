
const photos = [
  { src: "https://picsum.photos/seed/pulse-gallery-1/600/600", alt: "Volunteers sorting donated winter clothes" },
  { src: "https://picsum.photos/seed/pulse-gallery-2/600/600", alt: "A team cleaning a riverbank" },
  { src: "https://picsum.photos/seed/pulse-gallery-3/600/600", alt: "Children planting saplings" },
  { src: "https://picsum.photos/seed/pulse-gallery-4/600/600", alt: "Hot meals being served at a community kitchen" },
  { src: "https://picsum.photos/seed/pulse-gallery-5/600/600", alt: "Volunteers handing out blankets at night" },
  { src: "https://picsum.photos/seed/pulse-gallery-6/600/600", alt: "A free health camp in a village" },
  { src: "https://picsum.photos/seed/pulse-gallery-7/600/600", alt: "Neighbours packing relief supplies" },
  { src: "https://picsum.photos/seed/pulse-gallery-8/600/600", alt: "A blood donation camp" },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <p className="section-kicker">From the field</p>
      <h2 className="section-title mt-2">Moments that stay with us</h2>
      <p className="section-lead mt-3">
        A look at the kind of mornings PeoplePulse events are made of.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.src} className="group aspect-square overflow-hidden rounded-box bg-base-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}