//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let names=document.getElementById('name');
let email=document.getElementById('email');
let contribute = document.getElementById('footer');
let details_box = document.querySelector('.details');

contribute.style.display='none';

// if startQuiz button clicked
start_btn.onclick = ()=>{
    let user_name=names.value;
    let user_email=email.value; 
    if (user_name !=""  && user_email!="")
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user_email))
        {
            questions.sort(() => Math.random() - 0.5)
            questions = questions.slice(0, 5)
            info_box.classList.add("activeInfo"); //show info box
            details_box.style.display='none';
        }
        else
        {
            alert("You have entered an invalid email address!")
            return (false)
        }
    }
    else if(user_name ==""  && user_email=="")
    {
        info_box.style.display='block';
        alert("Please Enter Your Name and Email ID");
    }
    else if(user_name=="")
    {
        info_box.style.display='block';
        alert("Please Enter Your Name")
    }
    else if(user_email=="")
    {
        info_box.style.display='block';
        alert("Please Enter Your Email ID")
    }    
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    details_box.style.display='block';
    names.value="";
    email.value="";
}
    
// if continueQuiz button clicked
continue_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function

}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    let user_name=names.value;
    let user_email=email.value;
    let fail=0;
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<p>Congrats 🎉' + user_name+' </p> <p> You got '+ userScore +' out of '+ questions.length +'</p>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        fail=1;
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<p>Nice Work😎 '+user_name+ '</p> <p> You got '+ userScore +' out of '+ questions.length +'</p>';
        scoreText.innerHTML = scoreTag;
        fail=1;
    }
    else{ // if user scored less than 1
        let scoreTag = '<p>sorry 😐 '+user_name+ '</p> <p>You got only '+ userScore +' out of '+ questions.length +'</p>';
        scoreText.innerHTML = scoreTag;
        fail=0;
    }
    contribute.style.display='block';
    contribute.innerText="Designed By team NeverSettle:- Ananya,Anouksha,Udhay,Chetan,Sohan"
    function sendmail(){
        console.log("Hello")
        var name = user_name;
        var message = "Hey <span style = 'font-weight:bold'>"+name+"</span> ,You have got <span style = 'font-weight:bold'>"+userScore+" </span> out of <span style = 'font-weight:bold'>"+ questions.length+'</span>';
        if (fail==1)
        {
            var subject = "<span>Result Announced -- </span><span style = 'font-weight:bold'>PASS</span>";
        }
        else
        {
            var subject = "<span>Result Announced -- </span><span style = 'font-weight:bold'>FAIL</span>";
        }

        var Body=subject+'<br>'+message;
        //console.log(name, phone, email, message); 

        Email.send({
            SecureToken:"fbf31702-bb7f-4a4e-9c1c-4ccf17ee777f",
            To: user_email,
            From: "onlyfortesting03@gmail.com",
            Subject: "Result Declared",
            Body: Body
        }).then(
            message =>{
                //console.log (message);
                if(message=='OK'){
                alert("Your Result's Status has been sent on your Mail ID. Thank you for giving Test.");
                }
                else{
                    console.error (message);
                    alert('There is error at sending mail. ')
                    
                }
            }
        );
    }
    sendmail()
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            if(que_count < questions.length - 1){ //if question count is less than total question length
                que_count++; //increment the que_count value
                que_numb++; //increment the que_numb value
                showQuetions(que_count); //calling showQestions function
                queCounter(que_numb); //passing que_numb value to queCounter
                clearInterval(counter); //clear counter
                clearInterval(counterLine); //clear counterLine
                startTimer(timeValue); //calling startTimer function
                startTimerLine(widthValue); //calling startTimerLine function
                timeText.textContent = "Time Left"; //change the timeText to Time Left
                next_btn.classList.remove("show"); //hide the next button
            }else{
                clearInterval(counter); //clear counter
                clearInterval(counterLine); //clear counterLine
                showResult(); //calling showResult function
            }
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}