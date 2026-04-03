import { useState } from 'react';
import { LanguageObj, StyleSwitchVerbiage } from '../types';

interface PropTypes {
  languages: LanguageObj[];
  switchLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  switchStyle: () => void;
  styleVerbiages: StyleSwitchVerbiage;
}

export const LanguageSelect = ({
  value,
  languages,
  switchLanguage,
  switchStyle,
  styleVerbiages,
}: PropTypes) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!styleVerbiages) return null;

  const handleSwitchStyle = () => {
    switchStyle();
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── DESKTOP — barra fixa no topo (≥ 576px) ── */}
      <div className="lang-select container-fluid control-wrapper p-0 m-0 d-none d-sm-block">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto mt-2 mb-2 ms-3">
            <div className="lang">
              <select
                className="selector"
                name="select-language"
                onChange={switchLanguage}
                value={value}
              >
                {languages.map((language: LanguageObj) => (
                  <option key={language.id} value={language.name}>
                    {language.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-auto mt-2 mb-2 me-3">
            <div className="change-style">
              <span>
                {styleVerbiages.verbiage}
                <a
                  className="ps-1"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    switchStyle();
                  }}
                >
                  {styleVerbiages.button_verbiage}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE — botão hambúrguer fixo + drawer (< 576px) ── */}
      <div className="d-sm-none">
        {/* botão hambúrguer */}
        <button
          className="mobile-menu-toggle"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* overlay escuro */}
        {mobileOpen && (
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* drawer de baixo para cima */}
        <div className={`mobile-menu-drawer${mobileOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true">
          <button
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          <div className="mobile-menu-item">
            <label htmlFor="mobile-lang-select" className="mobile-menu-label">
              Language
            </label>
            <select
              id="mobile-lang-select"
              className="selector"
              name="select-language"
              onChange={(e) => {
                switchLanguage(e);
                setMobileOpen(false);
              }}
              value={value}
            >
              {languages.map((language: LanguageObj) => (
                <option key={language.id} value={language.name}>
                  {language.description}
                </option>
              ))}
            </select>
          </div>

          <div className="mobile-menu-item">
            <span className="mobile-menu-label">{styleVerbiages.verbiage}</span>
            <a
              href="#"
              className="mobile-menu-action"
              onClick={(e) => {
                e.preventDefault();
                handleSwitchStyle();
              }}
            >
              {styleVerbiages.button_verbiage}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};