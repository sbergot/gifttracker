using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace gifttracker.Migrations
{
    public partial class wip3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurences_Individuals_IndividualId",
                table: "Occurences");

            migrationBuilder.DropIndex(
                name: "IX_Occurences_IndividualId",
                table: "Occurences");

            migrationBuilder.DropColumn(
                name: "IndividualId",
                table: "Occurences");

            migrationBuilder.CreateIndex(
                name: "IX_Occurences_ReceiverId",
                table: "Occurences",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurences_Individuals_ReceiverId",
                table: "Occurences",
                column: "ReceiverId",
                principalTable: "Individuals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurences_Individuals_ReceiverId",
                table: "Occurences");

            migrationBuilder.DropIndex(
                name: "IX_Occurences_ReceiverId",
                table: "Occurences");

            migrationBuilder.AddColumn<int>(
                name: "IndividualId",
                table: "Occurences",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Occurences_IndividualId",
                table: "Occurences",
                column: "IndividualId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurences_Individuals_IndividualId",
                table: "Occurences",
                column: "IndividualId",
                principalTable: "Individuals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
