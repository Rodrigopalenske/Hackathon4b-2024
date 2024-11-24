<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dia_indisponivels', function (Blueprint $table) {
            $table->id();
            $table->integer("ambiente_id")->constrained('ambientes')->onDelete('cascade');
            $table->date("data");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dia_indisponivels');
    }
};
