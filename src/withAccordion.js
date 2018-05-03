import React, { Component } from 'react';

const ref = React.createRef();
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withAccordion(WrappedComponent, selectData) {
  // ...and returns another component...
  class WithAccordion extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        isOpen: false
      }
      this.myRef = React.createRef();
      this.triggers = [];
      this.onAccordionToggle = this.onAccordionToggle.bind(this);
      this.removeListeners = this.removeListeners.bind(this);
      this.addListeners = this.addListeners.bind(this);
    }
    componentDidMount(){
      if(this.props.mobileMode){
        this.addListeners();
      }
    }
    componentWillReceiveProps(nextProps){
      if(this.props.mobileMode !== nextProps.mobileMode){
        this.removeListeners();
        if(this.props.mobileMode){
          this.addListeners();
        }
      }
    }
    componentWillUnmount(){
      this.removeListeners();
    }
    addListeners(){
      this.triggers = [].slice.call(this.myRef.current.querySelectorAll('.accordion-trigger'));
      this.triggers.forEach(trigger=>trigger.addEventListener('click', this.onAccordionToggle));
    }
    removeListeners(){
      this.triggers.forEach(trigger=>trigger.removeEventListener('click', this.onAccordionToggle));
    }
    onAccordionToggle(e){
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
    render() {
      const {forwardedRef, ...rest} = this.props;
      return (
        <div ref={this.myRef}>
          <WrappedComponent {...this.props} {...this.state} ref={forwardedRef} />
        </div>
      );
    }
  }
  WithAccordion.displayName = `WithAccordion(${getDisplayName(WrappedComponent)})`;
  return React.forwardRef((props, ref) => {
    return <WithAccordion {...props} forwardedRef={ref} />;
  });;
}
export default withAccordion;