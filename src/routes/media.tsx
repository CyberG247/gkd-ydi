import { useState, useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  MapPin,
  Sparkles,
  Tag,
  ArrowRight,
  Search,
  CheckCircle2,
  Share2,
  ZoomIn,
  GraduationCap,
  Scale,
  History,
  Building2,
  BookOpenCheck,
  ShieldCheck,
  Users2,
  Laptop,
  Layers,
  Compass,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import {
  MEDIA_UPDATES,
  MEDIA_CATEGORIES,
  type MediaItem,
  type KeyPoint,
} from "@/components/site/media-data";
import { MediaGalleryModal, type GalleryImage } from "@/components/site/MediaGalleryModal";

const TITLE = "Media & Updates | GKD-YDI";
const DESCRIPTION =
  "Official announcements, patron appointments, stakeholder dialogues, and programme updates from Gidan Karan Dawa Youth Development Initiatives in Northeast Nigeria.";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: MediaUpdatesPage,
});

// Helper to choose appropriate icons for key takeaway cards
function getKeyPointIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("infrastructure") || lower.includes("software") || lower.includes("tech"))
    return Laptop;
  if (lower.includes("capacity") || lower.includes("practical")) return Layers;
  if (lower.includes("alignment") || lower.includes("institutional")) return Compass;
  if (lower.includes("growth") || lower.includes("strategic")) return Sparkles;
  if (lower.includes("ethical") || lower.includes("leadership")) return Scale;
  if (lower.includes("historical") || lower.includes("history")) return History;
  if (lower.includes("nation") || lower.includes("building")) return Building2;
  if (lower.includes("readiness") || lower.includes("exam")) return BookOpenCheck;
  if (lower.includes("barrier") || lower.includes("overcoming")) return ShieldCheck;
  if (lower.includes("collab") || lower.includes("partner")) return Users2;
  return CheckCircle2;
}

function MediaUpdatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Gallery Modal state
  const [modalImages, setModalImages] = useState<GalleryImage[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openGallery = (images: GalleryImage[], index = 0) => {
    setModalImages(images);
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  const handleShare = async (item: MediaItem) => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.summary,
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    }
  };

  const filteredUpdates = useMemo(() => {
    return MEDIA_UPDATES.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.keyPoints.some(
          (kp) =>
            kp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            kp.description.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredItem = MEDIA_UPDATES.find((item) => item.featured) || MEDIA_UPDATES[0];

  return (
    <>
      <PageHero
        eyebrow="Media & Updates"
        title="News, leadership advisories & field updates."
        description="Follow the latest progress, strategic engagements, stakeholder partnerships, and impactful stories from GKD-YDI across Yobe State and Northeast Nigeria."
        currentPath="/media"
      />

      {/* Filter & Search Bar */}
      <section className="border-b border-border bg-mist/50 py-6">
        <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {MEDIA_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-navy text-white shadow-sm"
                    : "bg-background text-navy/70 hover:bg-navy/10 hover:text-navy border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search updates, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>
      </section>

      {/* Featured Patron Appointment Story */}
      {selectedCategory === "All" && searchQuery === "" && featuredItem && (
        <section className="bg-background py-16 md:py-20">
          <div className="container-page">
            <div className="mb-8 flex items-center justify-between">
              <span className="eyebrow text-navy">Featured Announcement</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow/20 px-3 py-1 text-xs font-bold text-navy-deep">
                <Sparkles className="size-3.5 text-yellow-foreground fill-yellow" />
                Patron Appointment
              </span>
            </div>

            <article className="overflow-hidden border border-border bg-card shadow-sm transition-all hover:shadow-card">
              {/* Header Banner */}
              <div className="border-b border-border bg-mist/80 p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-navy">
                    <Calendar className="size-4 text-ocean" />
                    {featuredItem.formattedDate}
                  </span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1.5 text-navy">
                    <MapPin className="size-4 text-growth" />
                    {featuredItem.location}
                  </span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1 rounded bg-yellow px-2.5 py-0.5 font-bold text-navy-deep uppercase text-[10px] tracking-wider">
                    {featuredItem.category}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl leading-tight">
                  {featuredItem.title}
                </h2>
                {featuredItem.subtitle && (
                  <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
                    {featuredItem.subtitle}
                  </p>
                )}
              </div>

              {/* Body & Image Grid */}
              <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                <div>
                  <div className="space-y-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                    {featuredItem.content.map((paragraph, i) => (
                      <p key={i} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Patron Profile Callout Box */}
                  <div className="mt-8 rounded-sm border-l-4 border-yellow bg-mist p-5">
                    <div className="flex items-start gap-3.5">
                      <GraduationCap className="mt-1 size-6 shrink-0 text-navy" />
                      <div>
                        <h3 className="text-sm font-bold tracking-wide text-navy uppercase">
                          About the Patron
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          <strong>Dr. Usman Muhammad Dakasko</strong> serves as the Dean of the
                          Faculty of Education at <strong>Yobe State University</strong>. As Patron
                          of GKD-YDI, Dr. Dakasko brings seasoned academic governance, pedagogical
                          expertise, and strategic mentorship to guide the initiative’s
                          youth-centred development mandate across Northern Nigeria.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaways Grid */}
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-navy">{featuredItem.keyPointsHeading}</h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {featuredItem.keyPoints.map((point: KeyPoint) => {
                        const Icon = getKeyPointIcon(point.title);
                        return (
                          <div
                            key={point.title}
                            className="flex flex-col justify-between rounded-sm border border-border/80 bg-background p-4.5 transition-all hover:border-navy/40 hover:shadow-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2.5 text-navy font-bold text-sm">
                                <span className="grid size-7 place-items-center rounded bg-navy/5 text-navy">
                                  <Icon className="size-4 text-ocean" />
                                </span>
                                {point.title}
                              </div>
                              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                {point.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tags and Share Button */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Tag className="size-3.5 text-muted-foreground" />
                      {featuredItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-navy/80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(featuredItem)}
                      className="gap-2 text-xs"
                    >
                      <Share2 className="size-3.5" />
                      Share Announcement
                    </Button>
                  </div>
                </div>

                {/* Photo Gallery Grid */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold tracking-wider text-navy uppercase">
                      Session Photo Gallery
                    </h3>
                    <span className="text-xs text-muted-foreground">Click photo to enlarge</span>
                  </div>

                  <div className="grid gap-4">
                    {featuredItem.images.map((img, idx) => (
                      <figure
                        key={idx}
                        className="group relative cursor-pointer overflow-hidden border border-border bg-muted transition-all hover:border-navy"
                        onClick={() => openGallery(featuredItem.images, idx)}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 transition-colors group-hover:bg-navy-deep/40">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-navy opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 group-hover:scale-105">
                            <ZoomIn className="size-3.5" />
                            View Full Photo
                          </span>
                        </div>
                        <figcaption className="p-3 text-xs leading-relaxed text-muted-foreground bg-background border-t border-border">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* All Updates & Media Feed */}
      <section className="bg-mist/30 py-16 md:py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Updates Feed"
            title={
              selectedCategory === "All"
                ? "Recent Updates & Community Engagements"
                : `${selectedCategory} Updates`
            }
            description="Explore our chronological reports, educational initiatives, and collaborative milestones."
          />

          {filteredUpdates.length === 0 ? (
            <div className="mt-12 rounded border border-border bg-card p-12 text-center">
              <p className="text-lg font-bold text-navy">No updates found matching your search</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try selecting a different category or resetting your search query.
              </p>
              <Button
                variant="accent"
                className="mt-6"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {filteredUpdates.map((item) => (
                <Reveal key={item.id}>
                  <article className="flex h-full flex-col justify-between overflow-hidden border border-border bg-card shadow-xs transition-all hover:border-ocean/40 hover:shadow-card">
                    <div>
                      {/* Image header if available */}
                      {item.images.length > 0 && (
                        <div
                          className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-muted"
                          onClick={() => openGallery(item.images, 0)}
                        >
                          <img
                            src={item.images[0].src}
                            alt={item.images[0].alt}
                            className="size-full object-cover transition-transform duration-300 hover:scale-103"
                          />
                          <span className="absolute top-3 left-3 inline-flex items-center rounded-sm bg-navy/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-xs">
                            {item.category}
                          </span>
                          {item.images.length > 1 && (
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
                              +{item.images.length - 1} more photos
                            </span>
                          )}
                        </div>
                      )}

                      <div className="p-6 md:p-7">
                        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="size-3.5 text-ocean" />
                            {item.formattedDate}
                          </span>
                          <span>&bull;</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3.5 text-growth" />
                            {item.location}
                          </span>
                        </div>

                        <h3 className="mt-3.5 text-xl font-bold text-navy leading-snug">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.summary}
                        </p>

                        {/* Key Focus Points summary pill */}
                        {item.keyPoints.length > 0 && (
                          <div className="mt-5 border-t border-border/80 pt-4">
                            <p className="text-xs font-bold tracking-wider text-navy uppercase">
                              {item.keyPointsHeading}
                            </p>
                            <ul className="mt-2.5 space-y-2">
                              {item.keyPoints.map((kp) => {
                                const Icon = getKeyPointIcon(kp.title);
                                return (
                                  <li
                                    key={kp.title}
                                    className="flex items-start gap-2 text-xs text-muted-foreground"
                                  >
                                    <Icon className="mt-0.5 size-3.5 shrink-0 text-ocean" />
                                    <span>
                                      <strong className="text-navy">{kp.title}:</strong>{" "}
                                      {kp.description}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border bg-mist/40 px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-background px-2 py-0.5 text-[11px] font-medium text-navy/70 border border-border/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.images.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openGallery(item.images, 0)}
                            className="text-xs font-semibold text-ocean hover:text-ocean-foreground hover:bg-ocean"
                          >
                            View Photos ({item.images.length})
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleShare(item)}
                          aria-label="Share update"
                          className="size-8 text-muted-foreground hover:text-navy"
                        >
                          <Share2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Inquiries & Press Contact */}
      <section className="border-t border-border bg-background py-16">
        <div className="container-page max-w-4xl">
          <div className="rounded-lg border border-border bg-mist/60 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-navy">Media & Press Enquiries</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Are you a journalist, researcher, or development partner looking for official
              statements, high-resolution media assets, or interview availability with our
              leadership?
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="accent">
                <Link to="/contact">Contact Media Team</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/about">Learn About GKD-YDI</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Follow our journey as we build resilient communities."
        description="From academic tutorials to leadership governance and clean water access, partner with us to empower youth across Northeast Nigeria."
        primaryLabel="Support Our Work"
        primaryTo="/donate"
        secondaryLabel="Get Involved"
        secondaryTo="/get-involved"
      />

      {/* Lightbox / Modal */}
      <MediaGalleryModal
        images={modalImages}
        currentIndex={activeImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigate={(newIndex) => setActiveImageIndex(newIndex)}
      />
    </>
  );
}
