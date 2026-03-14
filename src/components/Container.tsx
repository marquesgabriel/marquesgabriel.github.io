interface PropTypes {
  classes: string;
  children: any;
  title: string;
  barButtons?: "full" | "close-only"
  activeStyle: string;
}

export const Container = ({ activeStyle, classes, children, title, barButtons = "full" }: PropTypes) => (<div className={`container-wrapper ${classes}`}>
  <div className="title">
    {activeStyle === 'win98' && (barButtons === "close-only" ? <div className="close-btn" />
      : <><div className="minimize-btn" /><div className="maximize-btn" /><div className="close-btn" /></>)}

    {title}
  </div>
  <div className="c-container">
    {children}
  </div>
</div>)