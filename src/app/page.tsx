import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, social as resourcesSocial, baseURL, routes } from "@/resources";
import { Posts } from "@/components/blog/Posts";
import { HomeShowcase } from "@/components/home/HomeShowcase";
import { AmbientVideo } from "@/components/home/AmbientVideo";
import styles from "@/components/home/HomeShowcase.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column className={styles.homePage} maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <AmbientVideo />
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}${home.image}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column className={styles.editorialHero} fillWidth horizontal="center" gap="m">
        <div className={styles.heroCopy}>
          <Text variant="heading-default-l">
            Welcome to my space. I am Preetham S, a second-year student at PES University.
          </Text>
        </div>
        <div className={styles.heroBox} role="img" aria-label="Rotating portfolio box labeled Portfolio, Code, Student, and Dev">
          <div className={styles.boxScene}>
            <div className={styles.box}>
              <div className={`${styles.boxFace} ${styles.boxFront}`}>PORTFOLIO</div>
              <div className={`${styles.boxFace} ${styles.boxRight}`}>CODE</div>
              <div className={`${styles.boxFace} ${styles.boxBack}`}>STUDENT</div>
              <div className={`${styles.boxFace} ${styles.boxLeft}`}>DEV</div>
            </div>
          </div>
        </div>
        <div className={styles.heroCopy}>
          <Text variant="heading-default-l">
            Exploring the digital realm through game development, 3D modeling, and programming.
          </Text>
        </div>
      </Column>
      <Column className={styles.heroDetails} fillWidth horizontal="center" gap="m">
        <RevealFx paddingTop="12" horizontal="center" paddingLeft="12">
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            weight="default"
            arrowIcon
          >
            <Row gap="8" vertical="center" paddingRight="4">
              {about.avatar.display && (
                <Avatar
                  marginRight="8"
                  style={{ marginLeft: "-0.75rem" }}
                  src={person.avatar}
                  size="m"
                />
              )}
              {about.title}
            </Row>
          </Button>
        </RevealFx>
        <Row className={styles.socialLinks} gap="8" wrap horizontal="center">
          {["GitHub", "LinkedIn", "Email"].map((name) => {
            const link = resourcesSocial.find((item) => item.name === name);
            return link ? (
              <Button
                key={link.name}
                href={link.link}
                prefixIcon={link.icon}
                size="m"
                variant="secondary"
                weight="default"
              >
                {link.name}
              </Button>
            ) : null;
          })}
        </Row>
      </Column>
      <HomeShowcase />
      {routes["/blog"] && (
        <Column fillWidth gap="24" marginBottom="l">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={48} />
          </Row>
          <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
            <Row flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Row>
            <Row flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Row>
          </Row>
          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={48} />
          </Row>
        </Column>
      )}
    </Column>
  );
}
