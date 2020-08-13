import React,{Component} from 'react'

export default class Coffee extends Component {
    componentDidMount(){
        let script = document.createElement("script");
        script.setAttribute('data-name','BMC-Widget')
        script.setAttribute('src','https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js')
        script.setAttribute('data-id', 'JeVlc7T');
        script.setAttribute('data-description', 'Support me on Buy me a coffee!');
        script.setAttribute('data-message', 'Hey Thanks for Visiting my Blog ❤️. Buy me a book 🙈 or a coffee ☕️?');
        script.setAttribute('data-color',"rebeccapurple")
        script.setAttribute('data-position','right')
        script.setAttribute('data-x_margin','18')
        script.setAttribute('data-y-margin','18')
        script.setAttribute('async',true)
        //Call window on load to show the image
        script.onload=function(){
            var evt = document.createEvent('Event');  
            evt.initEvent('load', false, false);  
            window.dispatchEvent(evt);
        }
        this.script=script
        document.head.appendChild(script)
    }

    componentWillUnmount(){
        document.head.removeChild(this.script);
        document.body.removeChild(document.getElementById("bmc-wbtn"))
     }

    render(){
        return(null)
    }
}
