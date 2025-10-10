import { PixelImage } from "@/components/ui/pixel-image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { TextAnimate } from "@/components/ui/text-animate";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

export async function getServerSideProps() {
  const grid = { rows: 8, cols: 8 }; // نفس الـ customGrid المستخدم في Hero
  const total = grid.rows * grid.cols;
  const maxAnimationDelay = 1200; // نفس القيمة الافتراضية في PixelImage
  const delays = Array.from(
    { length: total },
    () => Math.random() * maxAnimationDelay
  );
  const clipPaths = Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / grid.cols);
    const col = index % grid.cols;
    return `polygon(${col * (100 / grid.cols)}% ${row * (100 / grid.rows)}%, ${
      (col + 1) * (100 / grid.cols)
    }% ${row * (100 / grid.rows)}%, ${(col + 1) * (100 / grid.cols)}% ${
      (row + 1) * (100 / grid.rows)
    }%, ${col * (100 / grid.cols)}% ${(row + 1) * (100 / grid.rows)}%)`;
  });
  return { props: { delays, clipPaths } };
}

export default function Hero({
  delays,
  clipPaths,
}: {
  delays: number[];
  clipPaths: string[];
}) {
  return (
    <section id="Home" className="py-20 px-10">
      <div className="flex items-center justify-center gap-10">
        <div className="hidden lg:block">
          <PixelImage
            src="/images/hero.webp"
            customGrid={{ rows: 8, cols: 8 }}
            grayscaleAnimation
            pixelFadeInDuration={1000}
            colorRevealDelay={1300}
            delays={delays}
            clipPaths={clipPaths}
          />
        </div>
        <div className="grid gap-5 px-5 text-center w-fit">
          <TypingAnimation
            typeSpeed={25}
            showCursor={false}
            className="font-inter text-xl sm:text-2xl bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent font-bold md:text-4xl"
          >
            Empowering Businesses to Grow with Smart Marketing
          </TypingAnimation>

          <TextAnimate
            className="text-center text-xl text-text md:text-2xl font-openSans"
            delay={1.7}
            duration={1.5}
            animation="blurIn"
            as="h1"
            once
          >
            We craft data-driven marketing strategies that help brands increase
            visibility, attract the right audience, and convert clicks into
            loyal customers.
          </TextAnimate>

          <TextAnimate
            className="text-lg bg-gradient-to-r from-grad-4 to-grad-2 bg-clip-text text-transparent"
            animation="scaleUp"
            by="text"
            delay={3.5}
            once
          >
            Let’s accelerate your growth today
          </TextAnimate>
          <BlurFade delay={4}>
            <div className="flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="cursor-pointer bg-transparent text-text flex items-center space-x-2"
              >
                <Link href={"tel:+201148620380"}>
                  <span>Book Your Free Consultation</span>
                </Link>
              </HoverBorderGradient>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
