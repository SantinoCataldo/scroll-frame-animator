'use client';

import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { ScrollFrameAnimator } from '@/components/ScrollFrameAnimator/ScrollFrameAnimator';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import ComponentExampleCode from '@/components/CompleteExampleCode';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState(enMessages);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage === 'en' || savedLanguage === 'es') {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    setMessages(language === 'en' ? enMessages : esMessages);

    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', language);
    }
  }, [language]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(`.${styles.languageMenu}`);
      if (menu && !menu.contains(event.target as Node) && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeTab, setCodeTab] = useState('usage');

  const copyComponentCode = () => {
    let code = '';

    switch (codeTab) {
      case 'usage':
        code = language === 'en' ? ComponentExampleCode.usage.en : ComponentExampleCode.usage.es;
        break;
      case 'component':
        code = ComponentExampleCode.tsx;
        break;
      case 'css':
        code = ComponentExampleCode.css;
        break;
    }

    navigator.clipboard.writeText(code)
  };

  return (
    <div className={styles.container}>
      <div className={styles.languageMenu}>
        <button
          onClick={toggleMenu}
          className={`${styles.menuToggle} ${menuOpen ? styles.menuOpen : ''}`}
        >
          <span className={styles.globe}>🌐</span>
          <span className={styles.currentLanguage}>{language === 'en' ? 'EN' : 'ES'}</span>
          <span className={styles.arrow}>▼</span>
        </button>

        <div className={`${styles.menuOptions} ${menuOpen ? styles.show : ''}`}>
          <button
            onClick={() => selectLanguage('en')}
            className={`${styles.languageOption} ${language === 'en' ? styles.active : ''}`}
          >
            <span className={styles.flag}>🇺🇸</span>
            <span>English</span>
          </button>
          <button
            onClick={() => selectLanguage('es')}
            className={`${styles.languageOption} ${language === 'es' ? styles.active : ''}`}
          >
            <span className={styles.flag}>🇪🇸</span>
            <span>Español</span>
          </button>
        </div>
      </div>

      <section className={styles.introSection}>
        <div className={styles.content}>
          <h1>{messages.intro.title}</h1>
          <p>{messages.intro.description}</p>
          <div className={styles.actionButtons}>
            <button
              className={styles.primaryButton}
              onClick={() => setCodeModalOpen(true)}
            >
              {messages.usage.viewCode}
            </button>
            <a
              href="https://github.com/username/scroll-frame-animator"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              {messages.usage.viewOnGithub}
            </a>
          </div>
        </div>
      </section>

      <ScrollFrameAnimator
        contentMode="overlay"
        background="linear-gradient(to bottom, #1a1a2e, #16213e)"
      >
        <div className={styles.overlayContent}>
          <h2>{messages.examples.fullWidthTitle}</h2>
          <p>{messages.examples.fullWidthDesc}</p>
        </div>
      </ScrollFrameAnimator>

      <ScrollFrameAnimator
        width="70%"
        position="right"
        framesPath="./frames2"
        framesCount={18}
        contentMode="side"
        background="linear-gradient(to bottom, #16213e, #000)"
      >
        <div>
          <h2>{messages.examples.halfWidthRightTitle}</h2>
          <p>{messages.examples.halfWidthRightDesc}</p>
          <ul>
            <li>{messages.examples.contentPositioning1}</li>
            <li>{messages.examples.contentPositioning2}</li>
            <li>{messages.examples.contentPositioning3}</li>
          </ul>
        </div>
      </ScrollFrameAnimator>

      <ScrollFrameAnimator
        width="50%"
        position="left"
        framesPath="./frames2"
        framesCount={18}
        contentMode="side"
      >
        <div>
          <h2>{messages.examples.halfWidthLeftTitle}</h2>
          <p>{messages.examples.halfWidthLeftDesc}</p>
          <ul>
            <li>{messages.examples.flexibility1}</li>
            <li>{messages.examples.flexibility2}</li>
            <li>{messages.examples.flexibility3}</li>
          </ul>
        </div>
      </ScrollFrameAnimator>

      <section className={styles.outroSection}>
        <div className={styles.content}>
          <h2>{messages.outro.title}</h2>
          <p>{messages.outro.description}</p>
          <div className={styles.frameRequirements}>
            <h3>{messages.frameRequirements.title}</h3>
            <p>{messages.frameRequirements.description}</p>
            <ul className={styles.requirementsList}>
              <li>{messages.frameRequirements.point1}</li>
              <li>{messages.frameRequirements.point2}</li>
              <li>{messages.frameRequirements.point3}</li>
              <li>{messages.frameRequirements.point4}</li>
              <li>{messages.frameRequirements.point5}</li>
            </ul>
          </div>

          <div className={styles.usageInstructions}>
            <h3>{messages.usage.howToUseTitle}</h3>
            <ol>
              <li>{messages.usage.step1}</li>
              <li>{messages.usage.step2}</li>
              <li>{messages.usage.step3}</li>
              <li>{messages.usage.step4}</li>
            </ol>

            <div className={styles.propertyTable}>
              <h4>{messages.usage.propsTitle}</h4>
              <table>
                <thead>
                  <tr>
                    <th>{messages.usage.propName}</th>
                    <th>{messages.usage.propType}</th>
                    <th>{messages.usage.propDefault}</th>
                    <th>{messages.usage.propDescription}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>framesCount</td>
                    <td>number</td>
                    <td>39</td>
                    <td>{messages.usage.framesCountDesc}</td>
                  </tr>
                  <tr>
                    <td>framesPath</td>
                    <td>string</td>
                    <td>"./frames"</td>
                    <td>{messages.usage.framesPathDesc}</td>
                  </tr>
                  <tr>
                    <td>framePrefix</td>
                    <td>string</td>
                    <td>"fraje-"</td>
                    <td>{messages.usage.framePrefixDesc}</td>
                  </tr>
                  <tr>
                    <td>frameExtension</td>
                    <td>string</td>
                    <td>"png"</td>
                    <td>{messages.usage.frameExtensionDesc}</td>
                  </tr>
                  <tr>
                    <td>animationSectionHeight</td>
                    <td>string</td>
                    <td>"500dvh"</td>
                    <td>{messages.usage.animationSectionHeightDesc}</td>
                  </tr>
                  <tr>
                    <td>width</td>
                    <td>string</td>
                    <td>"100%"</td>
                    <td>{messages.usage.widthDesc}</td>
                  </tr>
                  <tr>
                    <td>height</td>
                    <td>string</td>
                    <td>"100dvh"</td>
                    <td>{messages.usage.heightDesc}</td>
                  </tr>
                  <tr>
                    <td>position</td>
                    <td>string</td>
                    <td>"center"</td>
                    <td>{messages.usage.positionDesc}</td>
                  </tr>
                  <tr>
                    <td>objectFit</td>
                    <td>string</td>
                    <td>"cover"</td>
                    <td>{messages.usage.objectFitDesc}</td>
                  </tr>
                  <tr>
                    <td>contentMode</td>
                    <td>string</td>
                    <td>"overlay"</td>
                    <td>{messages.usage.contentModeDesc}</td>
                  </tr>
                  <tr>
                    <td>background</td>
                    <td>string</td>
                    <td>"#000"</td>
                    <td>{messages.usage.backgroundDesc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {codeModalOpen && (
        <div className={styles.codeModal}>
          <div className={styles.codeModalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setCodeModalOpen(false)}
            >
              ×
            </button>
            <h3>{messages.usage.componentCode}</h3>

            <div className={styles.codeTabs}>
              <button
                className={`${styles.codeTab} ${codeTab === 'usage' ? styles.activeTab : ''}`}
                onClick={() => setCodeTab('usage')}
              >
                {messages.usage.basicUsage}
              </button>
              <button
                className={`${styles.codeTab} ${codeTab === 'component' ? styles.activeTab : ''}`}
                onClick={() => setCodeTab('component')}
              >
                {messages.usage.fullComponent}
              </button>
              <button
                className={`${styles.codeTab} ${codeTab === 'css' ? styles.activeTab : ''}`}
                onClick={() => setCodeTab('css')}
              >
                {messages.usage.cssStyles}
              </button>
            </div>

            <div className={styles.codeBlock}>
              <pre>
                <code>
                  {codeTab === 'usage' &&
                    (language === 'en' ? ComponentExampleCode.usage.en : ComponentExampleCode.usage.es)
                  }

                  {codeTab === 'component' && ComponentExampleCode.tsx}

                  {codeTab === 'css' && ComponentExampleCode.css}
                </code>
              </pre>
              <button
                className={styles.copyButton}
                onClick={copyComponentCode}
              >
                {messages.usage.copyCode}
              </button>
            </div>
            <div className={styles.implementationDetails}>
              <h4>{messages.usage.implementationDetailsTitle}</h4>
              <p>{messages.usage.implementationDetails}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
