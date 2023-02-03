
$(document).ready(function() {

    // Store the image names in an array
    const images = ['cherry.png','grapes.png','heart.png','lemon.png','orange.png','seven.png','strawberry.png'];

    //Changes image
    function changeImage() {
        $('img').each(function (index, element) {
            $(element).attr("src", "images/"+ images[generateRandom()]);
        });
    }

    //Random image generator
    function generateRandom() {
        return Math.floor(Math.random() * images.length)
    }

    //Bet Amount
    let amount = 1;

    // Increment the amount when + button is clicked
    $('#increase-bet').click(function() {
        $('#bet-amount').text(++amount);
    });

    // Decrement the amount when - button is clicked
    $('#decrease-bet').click(function() {
        if(amount > 1) {
            $('#bet-amount').text(--amount);
        }
    });

    //Current Balance Amount
    let currentBalance = 50;

    // Anonymous function that plays slot machine based on winning or losing cases when the spin button is clicked
    $('#spin-btn').click(function () {
        //Runs as long as you have a positive balance
        if(currentBalance > 0 && amount <= currentBalance){
            changeImage();
            currentBalance = currentBalance - amount;
            $("#money").text(currentBalance);
            //User hits jackpot if all 3 slot images are the same
            if($('#first-slot').attr("src") === $('#second-slot').attr("src") && $('#second-slot').attr("src") === $('#third-slot').attr("src")){
                $('#part-1-heading').text('Congratulations! You won!').fadeTo(100,0.1).fadeTo(200,1.0).css('color', 'red');
                currentBalance = currentBalance + (15*amount);
                $("#money").text(currentBalance);
            //If you have $0 balance, stop the game
            }else if(currentBalance === 0) {
                $('#part-1-heading').text('You lost all your money!').fadeTo(100,0.1).fadeTo(200,1.0).css('color', 'red');
            // In any other situation, you didn't win, but still have balance, gameplay is preserved
            }else{
                $('#part-1-heading').text('You lost, spin again.').fadeTo(100,0.1).fadeTo(200,1.0).css('color', 'red');
            }
        //Won't let you bet more money than you have
        }else if(amount > currentBalance && currentBalance > 0 ){
            $('#part-1-heading').text('Invalid bet amount, you do not have enough money to bet $'+ amount).fadeTo(100,0.1).fadeTo(200,1.0).css('color', 'red');
        }
    }); //End anon function
}); // End document.ready()