import { Body, H1 } from "../designSystem/Typography"
import { createUseStyles, useTheme } from "../theme"
import { Layout } from "./Layout"

const useStyles = createUseStyles((_theme) => ({
  layout: {
    padding: "50px 50px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  instructionList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  chromeLink: {
    textDecoration: "underline",
  },
}))

export const ChromePluginDownload = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return (
    <Layout>
      <div className={styles.layout}>
        <H1>Installing the Chrome Plugin</H1>
        <Body>
          <i>
            This is temporary, until we manage to upload the plugin on the
            Chrome Extension store
          </i>
        </Body>
        <ol className={styles.instructionList}>
          <li>
            <a
              href={`https://heist-${
                import.meta.env.HEIST_PUBLIC_STAGE
              }-storage.s3.us-east-2.amazonaws.com/heistChromePlugin.zip`}
            >
              Download the plugin
            </a>{" "}
            and unzip it.
          </li>
          <li>
            In chrome go to{" "}
            <span className={styles.chromeLink}>chrome://extensions</span> (I
            would make this a link but chrome ignores it if I do, so you'll have
            to copy/paste)
          </li>
          <li>Turn on developer mode</li>
          <li>Click "Load Unpacked"</li>
          <li>
            Select the folder you unzipped (select the folder, not the things
            inside it).
          </li>
          <li>
            Go to{" "}
            <a
              href="https://www.westelm.com/products/penn-sofa-h10764/?cm_src=WsiAitc&recstrat=AITC-SBF%7CAITC-GRP-AFF-QNT-SBF"
              target="_blank"
            >
              this page
            </a>
            and make sure you can see the heist button
          </li>
        </ol>
      </div>
    </Layout>
  )
}
